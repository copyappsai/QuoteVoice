import Foundation
import Speech
import AVFoundation

@MainActor
public class SpeechManager: NSObject, ObservableObject, SFSpeechRecognizerDelegate {
    @Published public var transcript: String = ""
    @Published public var isRecording: boolean_t = 0
    @Published public var audioLevel: Float = 0.0
    @Published public var permissionGranted: Bool = false
    
    private let speechRecognizer = SFSpeechRecognizer(locale: Locale(identifier: "en-US"))
    private var recognitionRequest: SFSpeechAudioBufferRecognitionRequest?
    private var recognitionTask: SFSpeechRecognitionTask?
    private let audioEngine = AVAudioEngine()
    
    public override init() {
        super.init()
        speechRecognizer?.delegate = self
        requestPermissions()
    }
    
    public func requestPermissions() {
        SFSpeechRecognizer.requestAuthorization { authStatus in
            Task { @MainActor in
                switch authStatus {
                case .authorized:
                    self.permissionGranted = true
                default:
                    self.permissionGranted = false
                }
            }
        }
    }
    
    public func startRecording() {
        guard !audioEngine.isRunning else { return }
        
        transcript = ""
        isRecording = 1
        
        let audioSession = AVAudioSession.sharedInstance()
        do {
            try audioSession.setCategory(.record, mode: .measurement, options: .duckOthers)
            try audioSession.setActive(true, options: .notifyOthersOnDeactivation)
        } catch {
            print("Audio session error: \(error)")
        }
        
        recognitionRequest = SFSpeechAudioBufferRecognitionRequest()
        guard let recognitionRequest = recognitionRequest else { return }
        recognitionRequest.shouldReportPartialResults = true
        
        let inputNode = audioEngine.inputNode
        
        recognitionTask = speechRecognizer?.recognitionTask(with: recognitionRequest) { [weak self] result, error in
            guard let self = self else { return }
            
            if let result = result {
                Task { @MainActor in
                    self.transcript = result.bestTranscription.formattedString
                }
            }
            
            if error != nil || (result?.isFinal ?? false) {
                self.stopRecording()
            }
        }
        
        let recordingFormat = inputNode.outputFormat(forBus: 0)
        inputNode.installTap(onBus: 0, bufferSize: 1024, format: recordingFormat) { [weak self] buffer, _ in
            self?.recognitionRequest?.append(buffer)
            
            // Audio level metering
            guard let channelData = buffer.floatChannelData?[0] else { return }
            let frames = buffer.frameLength
            var sum: Float = 0
            for i in 0..<Int(frames) {
                sum += abs(channelData[i])
            }
            let avg = sum / Float(frames)
            Task { @MainActor in
                self?.audioLevel = min(1.0, avg * 5.0)
            }
        }
        
        audioEngine.prepare()
        do {
            try audioEngine.start()
        } catch {
            print("AudioEngine start error: \(error)")
        }
    }
    
    public func stopRecording() {
        audioEngine.stop()
        audioEngine.inputNode.removeTap(onBus: 0)
        recognitionRequest?.endAudio()
        recognitionTask?.cancel()
        
        recognitionRequest = nil
        recognitionTask = nil
        isRecording = 0
        audioLevel = 0.0
    }
}

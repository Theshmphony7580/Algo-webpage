import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from '@/hooks/use-toast';

interface VoiceSearchProps {
  onSearch: (query: string) => void;
}

export const VoiceSearch = ({ onSearch }: VoiceSearchProps) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = true;

      recognitionInstance.onresult = (event: any) => {
        const current = event.resultIndex;
        const transcriptText = event.results[current][0].transcript;
        setTranscript(transcriptText);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
        if (transcript) {
          onSearch(transcript);
          setTranscript('');
        }
      };

      recognitionInstance.onerror = () => {
        toast({ title: 'Voice search error', description: 'Could not recognize speech', variant: 'destructive' });
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }
  }, [transcript, onSearch]);

  const toggleListening = () => {
    if (!recognition) {
      toast({ title: 'Not supported', description: 'Voice search is not supported in your browser', variant: 'destructive' });
      return;
    }

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      setTranscript('');
      recognition.start();
      setIsListening(true);
    }
  };

  return (
    <div className="relative">
      <Button
        variant={isListening ? 'default' : 'ghost'}
        size="icon"
        onClick={toggleListening}
        className={isListening ? 'animate-pulse' : ''}
        aria-label="Voice search"
      >
        {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
      </Button>

      <AnimatePresence>
        {isListening && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full mt-2 right-0 glass-card p-4 min-w-[200px] z-50"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-sm font-medium">Listening...</span>
            </div>
            {transcript && (
              <p className="text-sm text-muted-foreground">{transcript}</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

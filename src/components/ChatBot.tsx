import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { fetchCMSData } from '../services/cmsService';
import { MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type ChatState = 
  | 'initial' 
  | 'qualify_traffic' | 'qualify_leads' | 'qualify_conversions' | 'qualify_not_sure'
  | 'micro_value' 
  | 'soft_permission'
  | 'lead_capture_name' | 'lead_capture_email' | 'lead_capture_phone' | 'lead_capture_business' 
  | 'completed';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState<ChatState>('initial');
  const [messages, setMessages] = useState<{ role: 'assistant' | 'user', text: string, options?: string[] }[]>([
    { role: 'assistant', text: "Hey — quick one 👋\nWhat are you trying to improve right now?", options: ["More Traffic", "More Leads", "Better Conversions", "Not sure yet"] }
  ]);
  const [leadData, setLeadData] = useState<any>({});
  const [cmsData, setCmsData] = useState<{ insights: any[], solutions: any[] }>({ insights: [], solutions: [] });
  const { register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate();

  // Triggers
  useEffect(() => {
    const hasDismissed = sessionStorage.getItem('chatbot_dismissed');
    if (hasDismissed) return;

    // Only auto-open after 30 seconds or 70% scroll
    const timer = setTimeout(() => {
      if (!sessionStorage.getItem('chatbot_dismissed')) {
        setIsOpen(true);
      }
    }, 30000);

    const handleScroll = () => {
      if (window.scrollY / document.body.scrollHeight > 0.7) {
        if (!sessionStorage.getItem('chatbot_dismissed')) {
          setIsOpen(true);
        }
        window.removeEventListener('scroll', handleScroll);
      }
    };
    window.addEventListener('scroll', handleScroll);
    
    // Fetch CMS Data
    fetchCMSData().then(setCmsData);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleChat = () => {
    if (isOpen) {
      // If user manually closes the chat, don't auto-open it again this session
      sessionStorage.setItem('chatbot_dismissed', 'true');
    }
    setIsOpen(!isOpen);
  };

  const addMessage = (role: 'assistant' | 'user', text: string, options?: string[]) => {
    setMessages(prev => [...prev, { role, text, options }]);
  };

  const processAnswer = async (value: string) => {
    addMessage('user', value);
    
    switch (state) {
      case 'initial':
        setLeadData({ ...leadData, interest: value });
        if (value === 'More Traffic') {
          addMessage('assistant', "Got it. Are you focusing on SEO or paid ads?", ["SEO", "Paid Ads", "Both"]);
          setState('qualify_traffic');
        } else if (value === 'More Leads') {
          addMessage('assistant', "What’s the biggest challenge right now?", ["Not enough leads", "Poor quality leads", "Too expensive"]);
          setState('qualify_leads');
        } else if (value === 'Better Conversions') {
          addMessage('assistant', "So traffic is coming in, but not converting well?", ["Yes", "Somewhat", "Not sure"]);
          setState('qualify_conversions');
        } else {
          addMessage('assistant', "No worries — what best describes your business?", ["D2C / Ecommerce", "SaaS", "Real Estate", "Other"]);
          setState('qualify_not_sure');
        }
        break;

      case 'qualify_traffic':
      case 'qualify_leads':
      case 'qualify_conversions':
      case 'qualify_not_sure':
        const relevantInsight = cmsData.insights.find(i => i.category === value) || cmsData.insights[0];
        addMessage('assistant', relevantInsight ? relevantInsight.content : "Makes sense.\nIn most cases, this happens because:\n\ntraffic isn’t aligned with intent\nfunnel isn’t optimized\nor channels aren’t working together\n\nFixing just one part usually doesn’t move the needle.");
        addMessage('assistant', "Want me to map out what would actually work for your case?", ["Yes, show me", "Not now"]);
        setState('soft_permission');
        break;

      case 'soft_permission':
        if (value === 'Yes, show me') {
          addMessage('assistant', "Cool — I’ll keep it quick.\n1. Name\nWhat should I call you?");
          setState('lead_capture_name');
        } else {
          addMessage('assistant', "No problem — feel free to explore. I’m here if you need help 👍");
          setState('completed');
        }
        break;

      case 'lead_capture_name':
        setLeadData({ ...leadData, name: value });
        addMessage('assistant', "2. Email\nWhere should I send the recommendations?");
        setState('lead_capture_email');
        break;

      case 'lead_capture_email':
        setLeadData({ ...leadData, email: value });
        addMessage('assistant', "3. Phone (Optional)\nIf you're open to it, we can walk you through it faster.\nWhat’s your number?");
        setState('lead_capture_phone');
        break;

      case 'lead_capture_phone':
        setLeadData({ ...leadData, phone: value });
        addMessage('assistant', "4. Business\nWhat’s your website or company name?");
        setState('lead_capture_business');
        break;

      case 'lead_capture_business':
        const finalData = { ...leadData, business: value, createdAt: serverTimestamp() };
        await addDoc(collection(db, 'leads'), finalData);
        addMessage('assistant', "Perfect — this helps a lot.\nWe’ll review this and suggest a clear next step.", ["Book Consultation"]);
        setState('completed');
        break;
    }
    setValue("answer", "");
  };

  const handleOptionClick = async (option: string) => {
    // CTA Actions
    if (option === 'Book Consultation') {
      window.open('https://calendar.google.com//YOUR-LINK', '_blank');
      return;
    }
    
    await processAnswer(option);
  };

  const handleInputSubmit = handleSubmit(async (data) => {
    await processAnswer(data.answer);
  });

  const showInput = ['lead_capture_name', 'lead_capture_email', 'lead_capture_phone', 'lead_capture_business'].includes(state);

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      <button
        onClick={toggleChat}
        className="w-14 h-14 bg-brand-primary text-brand-white rounded-full shadow-xl flex items-center justify-center hover:bg-brand-dark transition-all"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-20 right-0 w-96 bg-brand-white rounded-2xl shadow-2xl border border-brand-dark/10 overflow-hidden flex flex-col h-[500px]"
          >
            <div className="p-4 bg-brand-primary text-brand-white font-bold">Unified Platforms Assistant</div>
            
            <div className="flex-grow p-4 overflow-y-auto space-y-4">
              {messages.map((m, i) => (
                <div key={i} className={`p-3 rounded-lg ${m.role === 'user' ? 'bg-brand-primary/10 ml-auto max-w-[80%]' : 'bg-brand-dark/5 mr-auto max-w-[80%]'}`}>
                  <div className="whitespace-pre-line">{m.text}</div>
                  {m.options && (
                    <div className="mt-3 space-y-2">
                      {m.options.map(opt => (
                        <button key={opt} onClick={() => handleOptionClick(opt)} className="block w-full text-left px-4 py-2 bg-brand-white border border-brand-primary rounded-lg hover:bg-brand-primary hover:text-brand-white transition-colors">
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {showInput && (
              <form onSubmit={handleInputSubmit} className="p-4 border-t border-brand-dark/10">
                <input {...register("answer", { required: state !== 'lead_capture_phone' })} className="w-full px-4 py-2 rounded-lg border border-brand-dark/10" placeholder="Type your answer..." />
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

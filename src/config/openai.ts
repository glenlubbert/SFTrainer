// OpenAI Configuration
export const OPENAI_CONFIG = {
  apiKey: import.meta.env.VITE_OPENAI_API_KEY || '',
  model: import.meta.env.VITE_OPENAI_MODEL || 'gpt-4',
  temperature: parseFloat(import.meta.env.VITE_OPENAI_TEMPERATURE || '0.7'),
};

// Check if API key is configured
export const isOpenAIConfigured = () => {
  // In production builds, always return false to prevent API key exposure
  if (import.meta.env.PROD) {
    return false;
  }
  return !!OPENAI_CONFIG.apiKey && OPENAI_CONFIG.apiKey !== 'your_openai_api_key_here';
};

// Get configuration status message
export const getConfigStatus = () => {
  // In production, show a message about local development
  if (import.meta.env.PROD) {
    return {
      configured: false,
      message: 'AI Practice Mode is available in local development only. Clone the repo and add your OpenAI API key to use this feature.',
      type: 'info'
    };
  }
  
  if (!OPENAI_CONFIG.apiKey) {
    return {
      configured: false,
      message: 'OpenAI API key not found. Please add VITE_OPENAI_API_KEY to your .env.local file.',
      type: 'error'
    };
  }
  
  if (OPENAI_CONFIG.apiKey === 'your_openai_api_key_here') {
    return {
      configured: false,
      message: 'Please replace the placeholder API key with your actual OpenAI API key.',
      type: 'error'
    };
  }
  
  return {
    configured: true,
    message: 'OpenAI API configured successfully.',
    type: 'success'
  };
}; 
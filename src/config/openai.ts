// OpenAI Configuration
export const OPENAI_CONFIG = {
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  model: import.meta.env.VITE_OPENAI_MODEL || 'gpt-4',
  temperature: parseFloat(import.meta.env.VITE_OPENAI_TEMPERATURE || '0.7'),
};

// Check if API key is configured
export const isOpenAIConfigured = () => {
  return !!OPENAI_CONFIG.apiKey && OPENAI_CONFIG.apiKey !== 'your_openai_api_key_here';
};

// Get configuration status message
export const getConfigStatus = () => {
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
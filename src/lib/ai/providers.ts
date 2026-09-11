import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { createOpenAI } from '@ai-sdk/openai';
import { createAnthropic } from '@ai-sdk/anthropic';
import type { AIProvider } from '@/types';

export function createAIProvider(provider: AIProvider, apiKey: string, baseURL?: string) {
  switch (provider) {
    case 'google':
      return createGoogleGenerativeAI({ apiKey });
    case 'openai':
      return createOpenAI({ apiKey });
    case 'anthropic':
      return createAnthropic({ apiKey });
    case 'deepseek':
      return createOpenAI({ apiKey, baseURL: baseURL || 'https://api.deepseek.com' });
    case 'custom':
      return createOpenAI({ apiKey, baseURL });
    default:
      throw new Error(`Unknown provider: ${provider}`);
  }
}

export function getModel(provider: AIProvider, modelId: string, apiKey: string, baseURL?: string) {
  return createAIProvider(provider, apiKey, baseURL)(modelId);
}

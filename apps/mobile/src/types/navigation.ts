/**
 * Types for mobile app
 */

export interface NavigationStackParamList {
  Auth: undefined;
  Home: undefined;
  Matches: undefined;
  Chat: { conversationId: string };
  Profile: { userId: string };
  Settings: undefined;
}

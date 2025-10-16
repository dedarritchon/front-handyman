export type ToolCategory =
  | 'calculators'
  | 'converters'
  | 'utilities'
  | 'cx-tools';

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: ToolCategory;
  icon: string;
  component: React.ComponentType;
}

export interface FavoriteTools {
  [toolId: string]: boolean;
}


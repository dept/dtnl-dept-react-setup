export interface IColorValue {
  value: string;
}

export interface INestedColor {
  [key: string]: IColorValue;
}

export interface IColors {
  [key: string]: INestedColor | IColorValue;
}

export interface RootObject {
  colors: IColors;
}

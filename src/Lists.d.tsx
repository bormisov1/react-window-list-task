import {ComponentType, CSSProperties} from "react";

export interface ListChildComponentProps {
  index: number;
  key: string;
  style?: CSSProperties;
}

export interface ListProps {
  width: number;
  height: number;
  itemCount: number;
  children?: ComponentType<ListChildComponentProps>;
}

export interface FixedSizeListProps extends ListProps {
  itemSize: number;
}

export interface FixedSizeListState {
  firstIndexShown: number;
}

export interface VariableSizeListProps extends ListProps {
  getItemSize: (index: number) => number;
}

export interface VariableSizeListState {
  firstIndexShown: number;
}

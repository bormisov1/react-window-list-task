import React from "react";
import {VariableSizeListProps, VariableSizeListState} from "./Lists.d";

export class VariableSizeList extends React.Component<VariableSizeListProps, VariableSizeListState>{
  private readonly containerRef: React.RefObject<HTMLDivElement>;
  private readonly listRef: React.RefObject<HTMLDivElement>;

  constructor(props: VariableSizeListProps) {
    super(props);
    this.containerRef = React.createRef();
    this.listRef = React.createRef();
  }

  render() {
    const {width, height, itemCount} = this.props;
    const Row = this.props.children || (() => <div></div>);

    type ListProps = {
      paddingTop: number,
      scroll: number,
      totalHeight: number,
      displayedAmount: number,
      aboveAmount: number
    };
    const List = (props: ListProps) => {
      const shownItems = new Array(Math.min(props.displayedAmount, itemCount - props.aboveAmount + 1))
        .fill(undefined)
        .map((el, index) => {
          index += Math.max(props.aboveAmount, 0);
          return <Row index={index} style={{height: this.props.getItemSize(index)}} key={index.toString()}></Row>;
        });
      return (
        <div className="list" ref={this.listRef} style={{height: props.totalHeight - props.paddingTop, paddingTop: props.paddingTop}}>
          {shownItems}
        </div>
      );
    };

    const ListContainer = () => {
      const [scroll, setScroll] = React.useState<number>(0);
      const {paddingTop, totalHeight, displayedAmount, aboveAmount} = this.calculateRenderData(scroll);
      return (
        <div ref={this.containerRef}
             style={{height, width, overflow: 'auto'}}
             onScroll={(e) => setScroll((e.target as Element).scrollTop)}
        >
          <List paddingTop={paddingTop}
                scroll={scroll}
                totalHeight={totalHeight}
                displayedAmount={displayedAmount}
                aboveAmount={aboveAmount}
          />
        </div>
      );
    };
    return <ListContainer />;
  }

  calculateRenderData(scroll: number) {
    const {height, itemCount, getItemSize} = this.props;
    let inspectedDistance = 0, aboveAmount = 0, displayedAmount = 0, paddingTop = 0;
    for (let i = 0; i < itemCount; i++) {
      const nextItemBottom = inspectedDistance + getItemSize(i) + getItemSize(i + 1);
      if (nextItemBottom < Math.max(0, scroll)) {
        aboveAmount++;
        paddingTop = inspectedDistance + getItemSize(i);
      } else if (inspectedDistance < scroll + height) {
        displayedAmount++;
      }
      inspectedDistance += getItemSize(i);
    }
    return {totalHeight: inspectedDistance, displayedAmount, aboveAmount, paddingTop};
  }
}

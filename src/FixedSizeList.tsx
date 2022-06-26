import React from 'react';
import {FixedSizeListProps, FixedSizeListState} from "./Lists.d";

export class FixedSizeList extends React.Component<FixedSizeListProps, FixedSizeListState>{
  private readonly containerRef: React.RefObject<HTMLDivElement>;
  private readonly listRef: React.RefObject<HTMLDivElement>;
  private displayedAmount: number;
  private firstIndexShown: number;

  constructor(props: FixedSizeListProps) {
    super(props);
    this.containerRef = React.createRef();
    this.listRef = React.createRef();
    const {height, itemSize} = this.props;
    this.displayedAmount = Math.ceil(height / itemSize) + 1;
    this.firstIndexShown = 0;
  }

  handleScroll() {
    if (this.containerRef.current) {
      this.firstIndexShown = Math.round(this.containerRef.current.scrollTop / this.props.itemSize);
    }
  }

  render() {
    const {width, height, itemCount, itemSize} = this.props;
    const Row = this.props.children || (() => <div></div>);
    const List = (props: {paddingTop: number}) => {
      const shownItems = new Array(Math.min(this.displayedAmount, itemCount - this.firstIndexShown + 1))
        .fill(undefined)
        .map((el, index) => {
          index += Math.max(this.firstIndexShown - 1, 0);
          return <Row index={index} key={index.toString()}></Row>;
        });
      return (
        <div ref={this.listRef} style={{height: itemCount * itemSize - props.paddingTop, paddingTop: props.paddingTop}}>
          {shownItems}
        </div>
      );
    };
    const ListContainer = () => {
      const [state, setState] = React.useState<{padding: number, startIndex: number}>({
        padding: itemSize * 5,
        startIndex: 0
      });
      const changeStartIndex = () => setState({
        padding: itemSize * Math.max(this.firstIndexShown - 1, 0),
        startIndex: this.firstIndexShown
      });
      React.useEffect(changeStartIndex, [])
      const handleScroll = () => {
        this.handleScroll();
        changeStartIndex();
      }
      return (
        <div ref={this.containerRef} onScroll={handleScroll}
             style={{height, width, overflow: 'auto'}}>
         <List paddingTop={state.padding} />
       </div>
      );
    };
    return <ListContainer />;
  }
}


declare type findDOMNodeType = (instance: any) => HTMLElement;
interface Option {
    logInstance?: boolean;
    ignoreNames?: string[];
    findDOMNode?: findDOMNodeType;
}
declare const withVisualizeRender: <P extends object>(WrappedComponent: any, option?: Option) => any;
export default withVisualizeRender;

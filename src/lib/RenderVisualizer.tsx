import React from 'react';
import ReactDOM from 'react-dom';
import { RenderVisualizerOptions, visualizeRender } from 'react-global-render-visualizer';

type findDOMNodeType = (instance: any) => HTMLElement;
interface Option {
    logInstance?: boolean;
    ignoreNames?: string[];
    findDOMNode?: findDOMNodeType,
}

const findDOMNode = ReactDOM.findDOMNode as findDOMNodeType;

const withVisualizeRender = <P extends object>(WrappedComponent: React.ComponentType<P>, option?: Option) => {
    if (process.env.NODE_ENV === 'production') {
        return WrappedComponent;
    }

    const renderOption: RenderVisualizerOptions = {
        logInstance: (option && option.logInstance) || false,
        ReactDOM: {findDOMNode: (option && option.findDOMNode) || findDOMNode},
        ignoreNames: (option && option.ignoreNames) || []
    };

    @visualizeRender(renderOption)
    class VisualizeRenderWrapper extends React.Component<P> {
        render() {
            return <WrappedComponent {...(this.props) as P} />;
        }
    }
    return VisualizeRenderWrapper;
};

export default withVisualizeRender;


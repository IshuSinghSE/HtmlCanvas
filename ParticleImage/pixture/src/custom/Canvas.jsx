import useCanvas from './useCanvas';

const Canvas = (props) => {
    const { draw, options, ...rest } = props;
    // const { context, ...moreConfig } = options
    const canvasRef = useCanvas(draw);

    return <canvas ref={canvasRef} {...rest} />;
    
};

export default Canvas;

// import './App.css';
import Canvas from './custom/Canvas';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
    const draw = (ctx, frameCount) => {
        ctx.canvas.width = 512;
        ctx.canvas.height = 512;

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        // ctx.fillStyle = `hsl(${frameCount}, 100%, 50%)`
        // ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

        ctx.fillStyle = `hsl(0, 100%, 0%)`;
        ctx.beginPath();
        // ctx.arc(ctx.canvas.width/2, ctx.canvas.height/2, 120 * Math.sin(frameCount * 0.05) ** 2, 0, 2 * Math.PI)
        ctx.arc(ctx.canvas.width / 2, ctx.canvas.height / 2, 120, 0, 2 * Math.PI);
        ctx.fill();
    };
    return (
        <div className="w-full h-screen flex flex-col items-center justify-center bg-slate-900  ">
          <Header />
            <Canvas
                draw={draw}
                className="bg-white/70 backdrop-blur-xl border-solid border-teal-500 border-4 rounded-xl"
            />
          <Footer/>
        </div>
    );
}

export default App;

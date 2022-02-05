import { useState } from "react";
import Game from "../components/Game";

export default function Home() {
  const [play, setPlay] = useState(false);
  function statusPlay() {
    setPlay(play ? false : true)
  }

  return (
    <div>
      <div className="flex justify-center w-screen h-screen bg-slate-900">
        <Game />
      </div>
    </div>
  )
}

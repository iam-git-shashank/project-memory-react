import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { motion } from "framer-motion";
import axios from "axios";



const shuffle = (array) => {
  const doubled = [...array, ...array];
  for (let i = doubled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [doubled[i], doubled[j]] = [doubled[j], doubled[i]];
  }
  
  return doubled.map((item, index) => ({
    id: index,
    emoji: item,
    flipped: false,
    matched: false,
  }));
};

export default function MemoryGame() {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [lockBoard, setLockBoard] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const images = [
    "https://images.unsplash.com/photo-1741866987680-5e3d7f052b87?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1741858822120-67b84694c095?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1742138162252-363d0d38a063?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1741945687057-5bf825598da9?q=80&w=2006&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1726930095303-4aac9ba8bb74?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNnx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1742944085736-65d142cef76d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1735615479490-237b941e996a?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1732282602521-0a80511c76c6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D ",
  ];
//   const [images, setimg] = useState([]);
 

  const resetGame = () => {
    setCards(shuffle(images));
    setFlippedCards([]);
    setLockBoard(false);
    setGameFinished(false);
  };

  useEffect(() => {
    resetGame();
  }, []);

  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.matched)) {
      setGameFinished(true);
    }
  }, [cards]);

  const handleClick = (card) => {
    if (lockBoard || card.flipped || card.matched) return;
console.log(card)
    const newCards = cards.map((c) =>
      c.id === card.id ? { ...c, flipped: true } : c
    );
    const newFlipped = [...flippedCards, card];

    setCards(newCards);
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setLockBoard(true);
      setTimeout(() => {
        const [first, second] = newFlipped;
        if (first.emoji === second.emoji) {
          setCards((prev) =>
            prev.map((c) =>
              c.emoji === first.emoji ? { ...c, matched: true } : c
            )
          );
        } else {
          setCards((prev) =>
            prev.map((c) =>
              c.id === first.id || c.id === second.id
                ? { ...c, flipped: false }
                : c
            )
          );
        }
        setFlippedCards([]);
        setLockBoard(false);
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="grid h-100 w-200 grid-cols-4 gap-4 max-w-md">
        {cards.map((card) => (
          <motion.div
            key={card.id}
            onClick={() => handleClick(card)}
            className="cursor-pointer"
            initial={false}
            animate={{ rotateY: card.flipped || card.matched ? 180 : 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="h-34 w-34 flex items-center justify-center text-2xl">
              <CardContent>
                {card.flipped || card.matched ? (
                  <img
                    src={card.emoji}
                    alt="card"
                    className="w-20 h-20 object-contain"
                  />
                ) : (
                  <span className="text-2xl">❓</span>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {gameFinished && (
        <button
          onClick={resetGame}
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          🔁 Retry
        </button>
      )}
    </div>
  );
}

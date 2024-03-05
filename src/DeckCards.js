import React, { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = "https://deckofcardsapi.com/api/deck/";

function DeckCards() {
  const [draw, setDraw] = useState([]);
  const [deck, setDeck] = useState(null);

  useEffect(function loadApiDeck() {
    async function getData() {
      const res = await axios.get(`${BASE_URL}/new/shuffle/`);
      setDeck(res.data);
    }
    getData();
  }, []);

  async function drawCard() {
    const res = await axios.get(`${BASE_URL}/${deck.deck_id}/draw/`);

    if (res.data.remaining === 0) {
      throw new Error("deck is empty");
    }
    const card = res.data.cards[0];
    setDraw((d) => [
      ...d,
      {
        id: card.code,
        name: card.suit + " " + card.value,
      },
    ]);
  }

  async function shuffle() {
    await axios.get(`${BASE_URL}/${deck.deck_id}/shuffle/`);
    setDraw([]);
  }

  return (
    <div>
      <button onClick={drawCard}>Draw from deck</button>
      <button onClick={shuffle}>Shuffle deck</button>
    </div>
  );
}

export default DeckCards;

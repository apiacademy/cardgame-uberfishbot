{
  "uber" :
  {
    "version" : "1.0",
    "data" : [
      {
        "rel" : "self",
        "url" : "http://example.com/cardgame-state" 
      },
      {
        "id" : "gameID",
        "value" : "q1w2e3",
        "label" : "Game ID"
      },
      {
        "id" : "deckID",
        "value" : "w2e3r4",
        "label" : "Deck ID"
      },
      {
        "id" : "opponentsLastMove",
        "value" : "???",
        "label" : "Opponent's Last Move"
      },
      {
        "id" : "cardsLost",
        "value" : "???",
        "label" : "Cards Lost"
      },
      {
        "id" : "cardsRequested",
        "value" : "???",
        "label" : "Cards Requested"
      },
      {
        "id" : "cardsLeft",
        "value" : "???",
        "label" : "Cards Left"
      },
      {
        "id" : "hands",
        "label" : "Hands",
        "data" : [
          {
            "name" : "player",
            "value" : "Ronnie",
            "label" : "Player",
            "data" : [
              {
                "name" : "cards",
                "label" : "Cards",
                "data" : [
                  {
                    "name" : "card",
                    "data" : [
                      {                
                        "name" : "rank",
                        "value" : "2",
                        "label" : "Rank"
                      },
                      {
                        "name" : "suit",
                        "value" : "Hearts",
                        "label" : "Suit"
                      }
                    ]
                  },
                  {
                    "name" : "card",
                    "data" : [
                      {                
                        "name" : "rank",
                        "value" : "5",
                        "label" : "Rank"
                      },
                      {
                        "name" : "suit",
                        "value" : "Diamonds",
                        "label" : "Suit"
                      }
                    ]
                  },
                  {
                    "name" : "card",
                    "data" : [
                      {                
                        "name" : "rank",
                        "value" : "10",
                        "label" : "Rank"
                      },
                      {
                        "name" : "suit",
                        "value" : "Clubs",
                        "label" : "Suit"
                      }
                    ]
                  }                  
                ]
              }             
            ]
          },
          {
            "name" : "player",
            "value" : "Irakli",
            "label" : "Player",
            "data" : [
              {
                "name" : "cards",
                "label" : "Cards",
                "data" : [
                  {
                    "name" : "card",
                    "data" : [
                      {                
                        "name" : "rank",
                        "value" : "?",
                        "label" : "Rank"
                      },
                      {
                        "name" : "suit",
                        "value" : "?",
                        "label" : "Suit"
                      }
                    ]
                  },
                  {
                    "name" : "card",
                    "data" : [
                      {                
                        "name" : "rank",
                        "value" : "?",
                        "label" : "Rank"
                      },
                      {
                        "name" : "suit",
                        "value" : "?",
                        "label" : "Suit"
                      }
                    ]
                  },
                  {
                    "name" : "card",
                    "data" : [
                      {                
                        "name" : "rank",
                        "value" : "?",
                        "label" : "Rank"
                      },
                      {
                        "name" : "suit",
                        "value" : "?",
                        "label" : "Suit"
                      }
                    ]
                  },
                  {
                    "name" : "card",
                    "data" : [
                      {                
                        "name" : "rank",
                        "value" : "?",
                        "label" : "Rank"
                      },
                      {
                        "name" : "suit",
                        "value" : "?",
                        "label" : "Suit"
                      }
                    ]
                  }                  
                ]
              }             
            ]
          }
        ]
      },
      {
        "id" : "OpponentsCardCount",
        "value" : "???",
        "label" : "Opponents Card Count"
      },
      {
        "id" : "activePlayer",
        "value" : "Ronnie",
        "label" : "Active Player"
      },
      {
        "id" : "gameState",
        "value" : "active",
        "label" : "Game State"
      },
      {
        "id" : "timeSinceLastMove",
        "value" : "???",
        "label" : "Time Since Last Move"
      },
      {
        "id" : "timeSinceLastHeartbeat",
        "value" : "???",
        "label" : "Time Since Last Heartbeat"
      },
      {
        "id" : "players",
        "label" : "Players",
        "data" : [
          {
            "name" : "player",
            "label" : "Player",
            "data" : [
              {
                "name" : "name",
                "value" : "Ronnie",
                "label" : "Name"
              },
              {
                "name" : "id",
                "value" : "aqswde",
                "label" : "ID"
              },
              {
                "name" : "avatar",
                "url" : "http://example.com/cardgame/avatars/aqswde",
                "rel" : "image",
                "transclude" : "true"
              }
            ]
          },
          {
            "name" : "player",
            "label" : "Player",
            "data" : [
              {
                "name" : "name",
                "value" : "Irakli",
                "label" : "Name"
              },
              {
                "name" : "id",
                "value" : "zaxscd",
                "label" : "ID"
              },
              {
                "name" : "avatar",
                "url" : "http://example.com/cardgame/avatars/zaxscd",
                "rel" : "image",
                "transclude" : "true"
              }
            ]
          }          
        ]
      },
      {
        "id" : "books",
        "label" : "Books", 
        "data" : [
          {
            "name" : "player",
            "label" : "Player",
            "data" : [
              {
                "name" : "name",
                "value" : "Ronnie",
                "label" : "Name",
                "data" : [
                  {
                    "name" : "book",
                    "label" : "Book",
                    "data" : [
                      {
                        "name" : "rank",
                        "value" : "4",
                        "label" : "Rank"
                      },
                      {
                        "name" : "rank",
                        "value" : "Q",
                        "label" : "Rank"
                      }
                    ]
                  }
                ]
              }  
            ]
          },
          {
            "name" : "player",
            "label" : "Player",
            "data" : [
              {
                "name" : "name",
                "value" : "Irakli",
                "label" : "Name",
                "data" : [
                  {
                    "name" : "book",
                    "label" : "Book",
                    "data" : [
                      {
                        "name" : "rank",
                        "value" : "5",
                        "label" : "Rank"
                      },
                      {
                        "name" : "rank",
                        "value" : "9",
                        "label" : "Rank"
                      },
                      {
                        "name" : "rank",
                        "value" : "J",
                        "label" : "Rank"
                      }
                    ]
                  }
                ]
              }  
            ]
          }
        ]
      },
      {
        "id" : "winner",
        "value" : "???",
        "label" : "Winner"
      }      
    ]
  }
}

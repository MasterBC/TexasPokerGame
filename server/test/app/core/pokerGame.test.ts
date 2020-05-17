import { PokerGame, EGameStatus } from '../../../src/app/core/PokerGame';
// @ts-ignore
import { expect } from 'chai';
import { IPlayer } from '../../../src/app/core/Player';

describe('test/app/core/pokerGame.test.ts', () => {
  const users: IPlayer[] = [
    {
      userId: '1',
      counter: 200,
      nickName: '1',
      account: '1',
      socketId: '1',
      buyIn: 0,
      reBuy: 0,
      actionSize: 0,
      actionCommand: '',
      status: 0,
      type: '',
    },
    {
      userId: '2',
      counter: 400,
      nickName: '2',
      account: '2',
      socketId: '2',
      buyIn: 0,
      reBuy: 0,
      actionSize: 0,
      actionCommand: '',
      status: 0,
      type: '',
    },
    // {
    //   userId: '3',
    //   counter: 50,
    //   nick_name: '3',
    //   account: '3',
    //   socketId: '3',
    // },
  ];

  /**
   * game ready
   */
  it('game init', async () => {
    const game = new PokerGame({
      smallBlind: 1,
      users,
      updateCommonCard: () => {},
      gameOverCallBack: () => {},
    });
    game.play();
    expect(game.status).to.equal(EGameStatus.GAME_ACTION);
    expect(game.pot).to.equal(3);
    expect(game.pot).to.equal(3);
    // expect(game.playerLink.getNode(1).node.actionSize).to.equal(1);
  });

  /**
   * game playing
   */
  it('game play', async () => {
    const game = new PokerGame({
      smallBlind: 1,
      users,
      updateCommonCard: () => {},
      gameOverCallBack: () => {},
    });
    game.play();
    game.action('raise:9');
    game.action('call');
    // game.action('call');
    // game.action('call');
    // game.action('call');
    // game.action('check');
    // game.sendCard();
    // game.action('raise:10');
    // game.action('raise:20');
    // game.action('call');
    // game.action('call');
    // game.action('raise:40');
    // game.action('call');
    // game.action('call');
    // game.action('call');
    // game.action('call');
    // game.sendCard();
    // game.action('allin');
    // game.action('allin');
    // game.action('allin');
    // game.action('fold');
    // game.action('allin');
    console.log('cc');
    // game.action('raise:10');
    console.log(game.commonCard);
    console.log(game.pot);
    console.log(game.getPlayers());
    console.log(game.winner);
    // console.log(game.winner[0][0], game.commonCard);
  });

  it('raise check ', async () => {
    const game = new PokerGame({
      smallBlind: 1,
      users,
      updateCommonCard: () => {
        if (game.status < 6) {
          game.startActionRound();
          game.sendCard();
        }
      },
      gameOverCallBack: () => {},
    });
    game.play();
    game.action('raise:9');
    game.action('call');
    game.action('check');
    game.action('check');
    // game.action('raise:10');
    console.log(game.commonCard);
    console.log(game.pot);
    console.log(game.getPlayers());
    console.log(game.winner);
    // console.log(game.winner[0][0], game.commonCard);
  });

  it('raise call raise fold ', async () => {
    const game = new PokerGame({
      smallBlind: 1,
      users,
      updateCommonCard: () => {
        if (game.status < 6) {
          game.startActionRound();
          game.sendCard();
        }
      },
      gameOverCallBack: () => {},
    });
    game.play();
    game.action('raise:9');
    game.action('call');
    // game.action('check');
    // game.action('check');
    game.action('raise:90');
    game.action('fold');
    // game.action('raise:10');
    console.log(game.commonCard);
    console.log(game.pot);
    console.log(game.getPlayers());
    console.log(game.winner);
    // console.log(game.winner[0][0], game.commonCard);
  });

  it('show down', async () => {
    const game = new PokerGame({
      smallBlind: 1,
      users,
      updateCommonCard: () => {
        if (game.status < 6) {
          game.startActionRound();
          game.sendCard();
        }
      },
      gameOverCallBack: () => {},
    });
    game.play();
    // pre flop
    game.action('raise:9');
    game.action('call');
    // flop
    game.action('raise:90');
    game.action('call');
    // turn
    game.action('check');
    game.action('check');
    // river
    game.action('raise:90');
    game.action('call');
    // show down
    // game.action('raise:10');
    console.log(game.commonCard);
    console.log(game.pot);
    console.log(game.getPlayers());
    console.log(game.winner);
    // console.log(game.winner[0][0], game.commonCard);
  });

  it('all player allin for pre flop', async () => {
    const game = new PokerGame({
      smallBlind: 1,
      users,
      updateCommonCard: () => {
        if (game.status < 6) {
          game.startActionRound();
          game.sendCard();
        }
      },
      gameOverCallBack: () => {},
    });
    game.play();
    // pre flop
    game.action('raise:9');
    game.action('allin');
    game.action('allin');
    // game over
    // game.action('raise:10');
    console.log('all player ------commonCard', game.commonCard);
    console.log('all player ------pot', game.pot);
    console.log('all player ------getPlayers', game.getPlayers());
    console.log('all player ------winner', game.winner);
    // console.log(game.winner[0][0], game.commonCard);
  });

  it('one player allin', async () => {
    const game = new PokerGame({
      smallBlind: 1,
      users,
      updateCommonCard: () => {
        if (game.status < 6) {
          game.startActionRound();
          game.sendCard();
        }
      },
      gameOverCallBack: () => {},
    });
    game.play();
    // pre flop
    game.action('raise:9');
    game.action('call');
    // game.action('raise: 9');
    // game.action('raise: 18');
    // game.action('raise: 200');
    // game.action('allin');
    // game over
    // game.action('raise:10');
    console.log(game.commonCard);
    console.log(game.pot);
    console.log(game.getPlayers());
    console.log(game.winner);
    // console.log(game.winner[0][0], game.commonCard);
  });

  it('player fold pre flop', async () => {
    const game = new PokerGame({
      smallBlind: 1,
      users,
      updateCommonCard: () => {
        if (game.status < 6) {
          game.startActionRound();
          game.sendCard();
        }
      },
      gameOverCallBack: () => {},
    });
    game.play();
    // pre flop
    game.action('fold');
    // game over
    // game.action('raise:10');
    console.log(game.commonCard);
    console.log(game.pot);
    console.log(game.getPlayers());
    console.log(game.winner);
    // console.log(game.winner[0][0], game.commonCard);
  });
  // flop
  // turn
  // river
  // chip in
    // has Allin need separate pot
      // many allin

  /**
   * game over
   */
  it('game over', async () => {
    const game = new PokerGame({
      smallBlind: 1,
      users,
      updateCommonCard: () => {
        if (game.status < 6) {
          game.startActionRound();
          game.sendCard();
        }
      },
      gameOverCallBack: () => {},
    });
    game.play();
    game.action('raise:10');
    game.action('allin');
    game.action('fold');

    console.log('game over----------- common', game.commonCard);
    console.log(game.pot);
    console.log(game.getPlayers());
    console.log(game.winner);
    // only one player
      // last player, other player fold

    // multiple  player
      // last player, has all in player
      // all player all in
        // one player all in
        // many player all in

    // winner
      // one winner
      // multiple winner
        // bisecting pot
        // allin player winner and small pot, multiple second winner bisecting pot
        // allin player winner and small pot, one second winner
        // all player allin, winner can't win all pot,
  });
  /**
   * count
   */
  it('count', async () => {

  });
  // has other pot
});

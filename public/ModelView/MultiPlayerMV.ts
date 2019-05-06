import MultiPlayerView from '../views/MultiPlayerView/MultiPlayer';
import MultiPlayerModel from '../models/MultiPlayerModel';
import FieldView from '../views/GameView/Field/Field';
import MessageView from '../views/MessageView/Message';
import PlayersListView from '../views/GameView/PlayersList/PlayersList';
/**
 *
 */
class MultiPlayerMV {
  view: typeof MultiPlayerView;
  model: MultiPlayerModel;
  fieldPanel: FieldView;
  messageView: MessageView;
  playersListView: PlayersListView;
  /**
   *
   */
  constructor() {
    this.view = MultiPlayerView;
    this.model = new MultiPlayerModel();
    this.playersListView = new PlayersListView();
    
  }
}
export default new MultiPlayerMV;
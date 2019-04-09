import leaderBoardTemplate from './LeaderBoard.pug';
import BaseView from '../BaseView';
import Bus from '../../utils/bus';

/** */
export default class LeaderBoardView extends BaseView {
  /**
   *
   * @param {*} parent
   */
  constructor(parent) {
    super(parent, leaderBoardTemplate, false);
    this._currPage = 1;

    Bus.on('respPagesAmount', this._initBoard.bind(this));
    
  }

  /**
   * Отрисовка лидербода и получение необходимой информации с бэкэнда
  */
  render() {
    Bus.on('respPage', this.renderUsers.bind(this));
    // const leaderboardTableRowDomElement = document.getElementsByClassName('leaderboard__table_row')[0];
    const maxHeight = screen.height * 0.7;
    console.log(maxHeight, ' ', Math.round(maxHeight / 70) );
    const divisionHeight = Math.round(maxHeight / 70);
    this.pageStruct = {page: 1, per_page: divisionHeight};
    Bus.emit('reqPagesAmount', this.pageStruct.per_page);
    Bus.emit('reqPage', this.pageStruct);
  }

  /**
   *
   * @param {*} users
   */
  renderUsers(users) {
    const usersStruct = {users: users, page: this._currPage, per_page: this.pageStruct.per_page};
    this.data = usersStruct;
    super.render();
    this.leaderBoardPageDomElement = this.parent.querySelector('.leaderboard__page');
    this.leaderBoardPageDomElement.innerHTML = this._currPage;
    this._initButtons();
  }

  /**
   *
   * @param {*} amount
   */
  _initBoard(amount) {
    this._pagesCount = amount;
    
  }

  /**
   * Установка листенеров на кнопки пагинации
   */
  _initButtons() {
    ([this._leftArrow, this._rightArrow] =
      this.parent.querySelectorAll('.leaderboard__arrow'));
    this._leftArrow.addEventListener('click', this._prevPage.bind(this));
    this._rightArrow.addEventListener('click', this._nextPage.bind(this));
    if (this._currPage === 1) {
      this._leftArrow.classList.add('leaderboard__arrow__inactive');
    } else {
      this._leftArrow.classList.remove('leaderboard__arrow__inactive');
    }
    if (this._currPage === this._pagesCount) {
      this._rightArrow.classList.add('leaderboard__arrow__inactive');
    } else {
      this._rightArrow.classList.remove('leaderboard__arrow__inactive');
    }
  }

  /**
   * Переключение на сл.страницу
   */
  _nextPage() {
    if (this._currPage === this._pagesCount) {
      return;
    }
    const maxHeight = screen.height * 0.7;
    console.log(maxHeight, ' ', Math.round(maxHeight / 70) );
    const divisionHeight = Math.round(maxHeight / 70);
    this.pageStruct = {page: ++this._currPage, per_page: divisionHeight};
    Bus.emit('reqPage', this.pageStruct);
  }

  /**
   * Переключение на пред.страницу
   */
  _prevPage() {
    if (this._currPage == 1) {
      return;
    }
    const maxHeight = screen.height * 0.7;
    const divisionHeight = Math.round(maxHeight / 70);
    this.pageStruct = {page: --this._currPage, per_page: divisionHeight};
    Bus.emit('reqPage', this.pageStruct);
    

  }
}

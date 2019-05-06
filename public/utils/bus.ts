/**
 *
 */
export class Bus {
  listeners: any;
  /**
   *
   */
  constructor() {
    this.listeners = {};
  }

  /**
   *
   * @param {*} event
   * @param {*} callback
   */
  on(event: string, callback: CallableFunction, place : string) { // подписываемся на событие
    //this.off(event, callback);
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push({callback : callback, place : place});
  }

  /**
   *
   * @param {*} event
   * @param {*} callback
   */
  off(event: string | number, callback: CallableFunction, place : string) { // отписываемся от события
    if (!this.listeners[event]) {
      return;
    }
    console.log('OFF ' + event + '    ' + this.listeners[event]);
    this.listeners[event] = this.listeners[event]
      .filter(function (listener: any) {
        return listener.place !== place;
      });
      console.log('OFF end ' + this.listeners[event]);
  }
  /**
   *
   * @param {*} event
   * @param {*} data
   */
  emit(event: string, data: any = '') { // публикуем (диспатчим, эмитим) событие
    if (!this.listeners[event]) {
      return;
    }
    this.listeners[event].forEach(function (listener: any) {
      listener.callback(data);
    });
  }
}

export default new Bus;

import BaseService from '../lib/baseService';
import { Context, inject, provide, plugin } from 'midway';
import { IRoom } from '../interface/IRoom';

@provide('RoomService')
export class RoomService extends BaseService {

  @inject()
  ctx: Context;

  @plugin()
  mysql: any;

  @plugin()
  redis: any;

  async findById(uid: string): Promise<IRoom> {
    return await this.mysql.get('room', { id: uid });
  }

  async findByRoomNumber(number: string): Promise<boolean> {
    const roomNumber = await this.redis.get(`room:${number}`);
    return !!roomNumber;
  }

  async add(expires: number = 36000) {
    const number = Math.floor(Math.random() * (1000000 - 100000)) + 100000;
    const result = await this.mysql.insert('room', { room_number: number });
    const roomRedis = await this.redis.set(`room:${number}`, `${number}`, 'ex', expires);
    if (result.affectedRows === 1 && roomRedis === 'OK') {
      return { roomNumber: number };
    } else {
      throw 'room add error';
    }
  }
}

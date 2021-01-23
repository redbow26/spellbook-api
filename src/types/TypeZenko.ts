import { Field, ObjectType } from "type-graphql";
import data from "../database/Zenko.json";

// Graphql Zenko type
@ObjectType()
export class TypeZenko {
  private _health: number;

  private _maxHealth: number;

  private _mana: number;

  private _maxMana: number;

  constructor() {
    this._health = data.health;
    this._maxHealth = data.maxHealth;
    this._mana = data.mana;
    this._maxMana = data.maxMana;
  }

  @Field() get health(): number {
    return this._health;
  }

  set health(value: number) {
    if (value < 0) this._health = 0;
    else if (value > this.maxHealth) this._health = this.maxHealth;
    else this._health = value;
  }

  @Field() get maxHealth(): number {
    return this._maxHealth;
  }

  set maxHealth(value: number) {
    if (value <= 0) this._maxHealth = 1;
    else if (value < this.health) this.health = value;
    this._maxHealth = value;
  }

  @Field() get mana(): number {
    return this._mana;
  }

  set mana(value: number) {
    if (value < 0) this.mana = 0;
    else if (value > this.maxMana) this._mana = this.maxHealth;
    else this._mana = value;
  }

  @Field() get maxMana(): number {
    return this._maxMana;
  }

  set maxMana(value: number) {
    if (value <= 0) this._maxMana = 1;
    else if (value < this.mana) this.mana = value;
    this._maxMana = value;
  }

  save() {
    data.health = this.health;
    data.maxHealth = this.maxHealth;
    data.mana = this.mana;
    data.maxMana = this.maxMana;
  }

  takeDamage(damage: number) {
    this.health -= damage;
  }

  useMana(mana: number) {
    this.mana -= mana;
  }
}

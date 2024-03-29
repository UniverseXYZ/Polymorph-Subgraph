// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Address,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class TokenMorphedEntity extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save TokenMorphedEntity entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save TokenMorphedEntity entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("TokenMorphedEntity", id.toString(), this);
  }

  static load(id: string): TokenMorphedEntity | null {
    return store.get("TokenMorphedEntity", id) as TokenMorphedEntity | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get tokenId(): BigInt {
    let value = this.get("tokenId");
    return value.toBigInt();
  }

  set tokenId(value: BigInt) {
    this.set("tokenId", Value.fromBigInt(value));
  }

  get oldGene(): BigInt {
    let value = this.get("oldGene");
    return value.toBigInt();
  }

  set oldGene(value: BigInt) {
    this.set("oldGene", Value.fromBigInt(value));
  }

  get newGene(): BigInt {
    let value = this.get("newGene");
    return value.toBigInt();
  }

  set newGene(value: BigInt) {
    this.set("newGene", Value.fromBigInt(value));
  }

  get price(): BigInt {
    let value = this.get("price");
    return value.toBigInt();
  }

  set price(value: BigInt) {
    this.set("price", Value.fromBigInt(value));
  }

  get eventType(): i32 {
    let value = this.get("eventType");
    return value.toI32();
  }

  set eventType(value: i32) {
    this.set("eventType", Value.fromI32(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get priceForGenomeChange(): BigInt {
    let value = this.get("priceForGenomeChange");
    return value.toBigInt();
  }

  set priceForGenomeChange(value: BigInt) {
    this.set("priceForGenomeChange", Value.fromBigInt(value));
  }
}

export class TransferEntity extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save TransferEntity entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save TransferEntity entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("TransferEntity", id.toString(), this);
  }

  static load(id: string): TransferEntity | null {
    return store.get("TransferEntity", id) as TransferEntity | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get from(): Bytes {
    let value = this.get("from");
    return value.toBytes();
  }

  set from(value: Bytes) {
    this.set("from", Value.fromBytes(value));
  }

  get to(): Bytes {
    let value = this.get("to");
    return value.toBytes();
  }

  set to(value: Bytes) {
    this.set("to", Value.fromBytes(value));
  }

  get tokenId(): BigInt {
    let value = this.get("tokenId");
    return value.toBigInt();
  }

  set tokenId(value: BigInt) {
    this.set("tokenId", Value.fromBigInt(value));
  }

  get tokenURI(): string {
    let value = this.get("tokenURI");
    return value.toString();
  }

  set tokenURI(value: string) {
    this.set("tokenURI", Value.fromString(value));
  }
}

export class MintedEntity extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save MintedEntity entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save MintedEntity entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("MintedEntity", id.toString(), this);
  }

  static load(id: string): MintedEntity | null {
    return store.get("MintedEntity", id) as MintedEntity | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get to(): Bytes {
    let value = this.get("to");
    return value.toBytes();
  }

  set to(value: Bytes) {
    this.set("to", Value.fromBytes(value));
  }

  get tokenId(): BigInt {
    let value = this.get("tokenId");
    return value.toBigInt();
  }

  set tokenId(value: BigInt) {
    this.set("tokenId", Value.fromBigInt(value));
  }

  get tokenURI(): string {
    let value = this.get("tokenURI");
    return value.toString();
  }

  set tokenURI(value: string) {
    this.set("tokenURI", Value.fromString(value));
  }
}

export class Trait extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Trait entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Trait entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Trait", id.toString(), this);
  }

  static load(id: string): Trait | null {
    return store.get("Trait", id) as Trait | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get count(): BigInt | null {
    let value = this.get("count");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set count(value: BigInt | null) {
    if (value === null) {
      this.unset("count");
    } else {
      this.set("count", Value.fromBigInt(value as BigInt));
    }
  }

  get rarity(): BigDecimal | null {
    let value = this.get("rarity");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigDecimal();
    }
  }

  set rarity(value: BigDecimal | null) {
    if (value === null) {
      this.unset("rarity");
    } else {
      this.set("rarity", Value.fromBigDecimal(value as BigDecimal));
    }
  }
}

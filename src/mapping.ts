import {
  Contract,
  Approval,
  ApprovalForAll,
  BaseGenomeChangePriceChanged,
  Paused,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
  SlopeChanged,
  TokenMorphed,
  Transfer,
  Unpaused
} from "../generated/Contract/Contract"
import { TokenMorphedEntity, TransferEntity } from "../generated/schema"

export function handleApproval(event: Approval): void {}

export function handleApprovalForAll(event: ApprovalForAll): void {}

export function handleBaseGenomeChangePriceChanged(
  event: BaseGenomeChangePriceChanged
): void {}

export function handlePaused(event: Paused): void {}

export function handleRoleAdminChanged(event: RoleAdminChanged): void {}

export function handleRoleGranted(event: RoleGranted): void {}

export function handleRoleRevoked(event: RoleRevoked): void {}

export function handleSlopeChanged(event: SlopeChanged): void {}

export function handleTokenMorphed(event: TokenMorphed): void {
  let tokenMorphed = new TokenMorphedEntity(event.params.tokenId.toHex());

  tokenMorphed.tokenId = event.params.tokenId;
  tokenMorphed.oldGene = event.params.oldGene;
  tokenMorphed.newGene = event.params.newGene;
  tokenMorphed.priceForGenomeChange = event.params.price;
  tokenMorphed.eventType = event.params.eventType;

  tokenMorphed.save();
}

export function handleTransfer(event: Transfer): void {
  let transfer = new TransferEntity(event.params.tokenId.toHex());
  let contract = Contract.bind(event.address)

  transfer.from = event.params.from;
  transfer.to = event.params.to;
  transfer.tokenId = event.params.tokenId;

  let tokenURI = contract.tokenURI(transfer.tokenId);

  transfer.tokenURI = tokenURI;


  transfer.save();
}

export function handleUnpaused(event: Unpaused): void {}

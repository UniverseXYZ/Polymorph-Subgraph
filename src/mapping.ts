import {
  Contract,
  Approval,
  ApprovalForAll,
  BaseGenomeChangePriceChanged,
  Paused,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
  TokenMorphed,
  Transfer,
  Unpaused,
  TokenMinted
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

export function handleTokenMinted(event: TokenMinted): void {}

export function handleTokenMorphed(event: TokenMorphed): void {
  let tokenMorphed = new TokenMorphedEntity(event.params.tokenId.toHex());
  let contract = Contract.bind(event.address)

  tokenMorphed.tokenId = event.params.tokenId;
  tokenMorphed.oldGene = event.params.oldGene;
  tokenMorphed.newGene = event.params.newGene;
  tokenMorphed.price = event.params.price;
  tokenMorphed.eventType = event.params.eventType;
  tokenMorphed.timestamp = event.block.timestamp;
  tokenMorphed.priceForGenomeChange = contract.priceForGenomeChange(tokenMorphed.tokenId);
  tokenMorphed.gene = contract.geneOf(tokenMorphed.tokenId);
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

import { ByteArray, log, BigInt, Value, store } from '@graphprotocol/graph-ts'
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
import { TokenMorphedEntity, TransferEntity, Trait } from "../generated/schema"

function parseGeneToTraits(gene: string): void {
  // CHARACTER MAP
  let charactersMap = new Map<i8, string>()
  charactersMap.set(0, "Diamond Paws")
  charactersMap.set(1, "Escrow")
  charactersMap.set(2, "Frankie")
  charactersMap.set(3, "Glenn")
  charactersMap.set(4, "Goldtooth")
  charactersMap.set(5, "Troll God")
  charactersMap.set(6, "Charles")
  charactersMap.set(7, "Mariguana")
  charactersMap.set(8, "Vitalik")
  charactersMap.set(9, "Ragnar")
  charactersMap.set(10, "X-YZ")

  // FOOTWEAR MAP
  let footwearMap = new Map<i8, string>()
  footwearMap.set(0, "No shoes")
  footwearMap.set(1, "Amish Shoes")
  footwearMap.set(2, "Astronaut Footwear")
  footwearMap.set(3, "Basketball Shoes")
  footwearMap.set(4, "Black Dress Shoes")
  footwearMap.set(5, "Black Ninja Boots")
  footwearMap.set(6, "Brown Dress Shoes")
  footwearMap.set(7, "Brown Spartan Sandals")
  footwearMap.set(8, "Chemical Protection Boots")
  footwearMap.set(9, "Clown Boots")
  footwearMap.set(10, "Golden Knight Boots")
  footwearMap.set(11, "Golden Shoes")
  footwearMap.set(12, "Golf Shoes")
  footwearMap.set(13, "Ice Skates")
  footwearMap.set(14, "Loafers")
  footwearMap.set(15, "Marine Boots")
  footwearMap.set(16, "Platinum Spartan Sandals")
  footwearMap.set(17, "Red Football Cleats")
  footwearMap.set(18, "Red Soccer Cleats")
  footwearMap.set(19, "Samurai Boots")
  footwearMap.set(20, "Silver Knight Boots")
  footwearMap.set(21, "Sneakers")
  footwearMap.set(22, "Sushi Chef Shoes")
  footwearMap.set(23, "Tennis Socks & Shoes")
  footwearMap.set(24, "White-Yellow Football Cleats")

  // PANTS MAP
  let pantsMap = new Map<i8, string>()
  pantsMap.set(0, "Underwear")
  pantsMap.set(1, "Amish Pants")
  pantsMap.set(2, "Argentina Pants")
  pantsMap.set(3, "Astronaut Pants")
  pantsMap.set(4, "Black Dress Pants")
  pantsMap.set(5, "Black Ninja Pants")
  pantsMap.set(6, "Black Pants")
  pantsMap.set(7, "Black Soccer Pants")
  pantsMap.set(8, "Blue Hockey Pants")
  pantsMap.set(9, "Blue Jeans")
  pantsMap.set(10, "Brazil Pants")
  pantsMap.set(11, "Cargo Shorts")
  pantsMap.set(12, "Chemical Protection Pants")
  pantsMap.set(13, "Classic Plaid Pants")
  pantsMap.set(14, "Clown Pants")
  pantsMap.set(15, "Golden Grieves")
  pantsMap.set(16, "Golden Pants")
  pantsMap.set(17, "Gray Jeans")
  pantsMap.set(18, "Grey Dress Pants")
  pantsMap.set(19, "Grey Football Pants")
  pantsMap.set(20, "Grey Pants")
  pantsMap.set(21, "Marine Pants")
  pantsMap.set(22, "Rainbow Pants")
  pantsMap.set(23, "Red Basketball Pants")
  pantsMap.set(24, "Red Football Pants")
  pantsMap.set(25, "Ribbed Zombie Pants")
  pantsMap.set(26, "Samurai Pants")
  pantsMap.set(27, "Silver Grieves")
  pantsMap.set(28, "Spartan Pants")
  pantsMap.set(29, "Sushi Chef Pants")
  pantsMap.set(30, "Taekwondo Pants")
  pantsMap.set(31, "Tennis Pants")
  pantsMap.set(32, "Tuxedo Pants")

  let torsoMap = new Map<i8, string>()
  torsoMap.set(0, "No Torso")
  torsoMap.set(1, "Amish Shirt")
  torsoMap.set(2, "Argentina Jersey")
  torsoMap.set(3, "Astronaut Torso")
  torsoMap.set(4, "Beer Mug Tshirt")
  torsoMap.set(5, "Black Ninja Robe")
  torsoMap.set(6, "Blue Hockey Jersey")
  torsoMap.set(7, "Bow Tie & Suit")
  torsoMap.set(8, "Brazil Jersey")
  torsoMap.set(9, "Chemical Protection Robe")
  torsoMap.set(10, "Clown Jacket")
  torsoMap.set(11, "Golden Armor")
  torsoMap.set(12, "Golden Jacket")
  torsoMap.set(13, "Golden Spartan Armor")
  torsoMap.set(14, "Grey Jacket")
  torsoMap.set(15, "Marine Shirt")
  torsoMap.set(16, "Platinum Spartan Armor")
  torsoMap.set(17, "Rainbow Jacket")
  torsoMap.set(18, "Red Basketball Jersey")
  torsoMap.set(19, "Red Collared Shirt")
  torsoMap.set(20, "Red Football Jersey")
  torsoMap.set(21, "Ribbed Zombie Shirt")
  torsoMap.set(22, "Samurai Armor")
  torsoMap.set(23, "Silver Armor")
  torsoMap.set(24, "Silver Spartan Armor")
  torsoMap.set(25, "Striped Soccer Jersey")
  torsoMap.set(26, "Suit & Tie")
  torsoMap.set(27, "Suit")
  torsoMap.set(28, "Sushi Chef Shirt")
  torsoMap.set(29, "Taekwondo Robe")
  torsoMap.set(30, "Tennis Shirt")
  torsoMap.set(31, "Tuxedo Jacket")
  torsoMap.set(32, "Weed Plant Tshirt")
  torsoMap.set(33, "White Football Jersey")

  // EYEWEAR MAP
  let eyewearMap = new Map<i8, string>()
  eyewearMap.set(0, "No Eyewear")
  eyewearMap.set(1, "3D Glasses")
  eyewearMap.set(2, "Bar Shades")
  eyewearMap.set(3, "Eye Paint")
  eyewearMap.set(4, "Golden Sunglasses")
  eyewearMap.set(5, "Monocle")
  eyewearMap.set(6, "Orange Sunglasses",)
  eyewearMap.set(7, "Purple Sunglasses")
  eyewearMap.set(8, "Respirator")
  eyewearMap.set(9, "Retro Glasses")
  eyewearMap.set(10, "Round Glasses")
  eyewearMap.set(11, "Sunglasses")
  eyewearMap.set(12, "VR Set")

  // HEAD MAP
  let headMap = new Map<i8, string>()
  headMap.set(0, "No Headwear")
  headMap.set(1, "Amish Hat")
  headMap.set(2, "Astronnaut Helmet")
  headMap.set(3, "Party Hat")
  headMap.set(4, "Black Golf Hat")
  headMap.set(5, "Black Ninja Headband")
  headMap.set(6, "Black Ushanka")
  headMap.set(7, "Blue Beanie")
  headMap.set(8, "Brown Ushanka")
  headMap.set(9, "Caesar Hat")
  headMap.set(10, "Clown Hat")
  headMap.set(11, "Copter Hat")
  headMap.set(12, "Golden Hat")
  headMap.set(13, "Golden Knight Helmet")
  headMap.set(14, "Golden Spartan Helmet")
  headMap.set(15, "Green Beanie")
  headMap.set(16, "Grey Football Helmet")
  headMap.set(17, "Marine Helmet")
  headMap.set(18, "Old Hat")
  headMap.set(19, "Platinum Spartan Helmet")
  headMap.set(20, "Purple Ushanka")
  headMap.set(21, "Rainbow Cap")
  headMap.set(22, "Red Beanie")
  headMap.set(23, "Red Football Helmet")
  headMap.set(24, "Silver Knight Helmet")
  headMap.set(25, "Silver Spartan Helmet")
  headMap.set(26, "Straw Hat")
  headMap.set(27, "Sushi Chef Hat")
  headMap.set(28, "Traffic Cone")
  headMap.set(29, "Tuxedo Hat")
  headMap.set(30, "Violet Beanie")

  // WEAPON RIGHT MAP
  let weaponRightMap = new Map<i8, string>()
  weaponRightMap.set(0, "No Right Hand Accesories")
  weaponRightMap.set(1, "American Football")
  weaponRightMap.set(2, "Amish Pitch Fork")
  weaponRightMap.set(3, "Banana")
  weaponRightMap.set(4, "Basketball")
  weaponRightMap.set(5, "Beer")
  weaponRightMap.set(6, "Big Gun")
  weaponRightMap.set(7, "Black Gun")
  weaponRightMap.set(8, "Blue Degen Sword")
  weaponRightMap.set(9, "Bong")
  weaponRightMap.set(10, "Bow & Arrow")
  weaponRightMap.set(11, "Corn Gun")
  weaponRightMap.set(12, "Diamond")
  weaponRightMap.set(13, "Double Degen Sword Blue")
  weaponRightMap.set(14, "Double Degen Sword Red")
  weaponRightMap.set(15, "Double Degen Sword Yellow")
  weaponRightMap.set(16, "Football")
  weaponRightMap.set(17, "Golden Gun")
  weaponRightMap.set(18, "Golden Spartan Sword")
  weaponRightMap.set(19, "Golf Club")
  weaponRightMap.set(20, "Green Degen Sword")
  weaponRightMap.set(21, "Grenade")
  weaponRightMap.set(22, "Hockey Stick")
  weaponRightMap.set(23, "Katana")
  weaponRightMap.set(24, "Platinum Spartan Sword")
  weaponRightMap.set(25, "Purple Degen Sword")
  weaponRightMap.set(26, "Red Degen Sword")
  weaponRightMap.set(27, "Shield")
  weaponRightMap.set(28, "Silver Spartan Sword")
  weaponRightMap.set(29, "Sushi Knife")
  weaponRightMap.set(30, "Sword")
  weaponRightMap.set(31, "Tennis Racket")

  // WEAPON LEFT MAP
  let weaponLeftMap = new Map<i8, string>()
  weaponLeftMap.set(0, "No Left Hand Accesories")
  weaponLeftMap.set(1, "American Football")
  weaponLeftMap.set(2, "Amish Pitch Fork")
  weaponLeftMap.set(3, "Banana")
  weaponLeftMap.set(4, "Basketball")
  weaponLeftMap.set(5, "Beer")
  weaponLeftMap.set(6, "Big Gun")
  weaponLeftMap.set(7, "Black Gun")
  weaponLeftMap.set(8, "Blue Degen Sword")
  weaponLeftMap.set(9, "Bong")
  weaponLeftMap.set(10, "Bow & Arrow")
  weaponLeftMap.set(11, "Corn Gun")
  weaponLeftMap.set(12, "Diamond")
  weaponLeftMap.set(13, "Double Degen Sword Blue")
  weaponLeftMap.set(14, "Double Degen Sword Red")
  weaponLeftMap.set(15, "Double Degen Sword Yellow")
  weaponLeftMap.set(16, "Football")
  weaponLeftMap.set(17, "Golden Gun")
  weaponLeftMap.set(18, "Golden Spartan Sword")
  weaponLeftMap.set(19, "Golf Club")
  weaponLeftMap.set(20, "Green Degen Sword")
  weaponLeftMap.set(21, "Grenade")
  weaponLeftMap.set(22, "Hockey Stick")
  weaponLeftMap.set(23, "Katana")
  weaponLeftMap.set(24, "Platinum Spartan Sword")
  weaponLeftMap.set(25, "Purple Degen Sword")
  weaponLeftMap.set(26, "Red Degen Sword")
  weaponLeftMap.set(27, "Shield")
  weaponLeftMap.set(28, "Silver Spartan Sword")
  weaponLeftMap.set(29, "Sushi Knife")
  weaponLeftMap.set(30, "Sword")
  weaponLeftMap.set(31, "Tennis Racket")


  let backgroundMap = new Map<i8, string>()
  backgroundMap.set(0, "Angel Tears")
  backgroundMap.set(1, "Aqua Splash")
  backgroundMap.set(2, "Crimson Blush")
  backgroundMap.set(3, "Deep Relief")
  backgroundMap.set(4, "Desert Hump")
  backgroundMap.set(5, "Eternal Constance")
  backgroundMap.set(6, "Flying High")
  backgroundMap.set(7, "Happy Fisher")
  backgroundMap.set(8, "Plum Plate")
  backgroundMap.set(9, "Squeaky Clean")
  backgroundMap.set(10, "Strong Bliss")
  backgroundMap.set(11, "Summer Salad")
  backgroundMap.set(12, "Winter Solstice")

  // GENE POSITIONS MAP
  let genePositionsMap = new Map<string, i32>()
  genePositionsMap.set("CHARACTER", 0)
  genePositionsMap.set("BACKGROUND", 1)
  genePositionsMap.set("PANTS", 2)
  genePositionsMap.set("TORSO", 3)
  genePositionsMap.set("FOOTWEAR", 4)
  genePositionsMap.set("EYEWEAR", 5)
  genePositionsMap.set("HEAD", 6)
  genePositionsMap.set("WEAPON_RIGHT", 7)
  genePositionsMap.set("WEAPON_LEFT", 8)

  // GENE TYPES BY INDEX MAP
  let geneTypesByIndex = new Map<i32, string>()
  geneTypesByIndex.set(0,"CHARACTER")
  geneTypesByIndex.set(1, "BACKGROUND")
  geneTypesByIndex.set(2, "PANTS" )
  geneTypesByIndex.set(3, "TORSO")
  geneTypesByIndex.set(4,"FOOTWEAR")
  geneTypesByIndex.set(5, "EYEWEAR")
  geneTypesByIndex.set(6, "HEAD")
  geneTypesByIndex.set(7, "WEAPON_RIGHT")
  geneTypesByIndex.set(8, "WEAPON_LEFT")

  let itemsCountByType= new Map<string, i32>();
  itemsCountByType.set("CHARACTER", 11)
  itemsCountByType.set("BACKGROUND", 12)
  itemsCountByType.set("PANTS",  33)
  itemsCountByType.set("TORSO", 34)
  itemsCountByType.set("FOOTWEAR",25)
  itemsCountByType.set("EYEWEAR", 13)
  itemsCountByType.set("HEAD", 31)
  itemsCountByType.set("WEAPON_RIGHT", 32)
  itemsCountByType.set("WEAPON_LEFT", 32)

  let adjustableGenes = gene.substring(gene.length - 18); // take the last 18 digits
  let genesToArray = adjustableGenes.split('');
  let groupsLength = 9; // 18 / 2
  var groupedGenes = new Array<string>(groupsLength) // ["89", "88", "20", "59", "38", "45", "81", "70", "92"]
  let geneDelimeter = 2;

  // Group the genes by pairs ["89", "88", "20", "59", "38", "45", "81", "70", "92"]
  for (let i: i32 = genesToArray.length - 1, j: i32 = 9 - 1; i >= 0; i-= geneDelimeter, j-=1) {
    let genom = genesToArray[i-1].concat(genesToArray[i])
    groupedGenes[j] = genom;
  };


  for (let i: i32 = 0; i <= groupsLength - 1; i+= 1) {
    let geneType = geneTypesByIndex.get(i); // CHARACTER
    let geneItemsCount = itemsCountByType.get(geneType); // 11
    let geneNumber = groupedGenes[i]; // "98"
    let intValue = parseInt(geneNumber) as i32;
    let itemIndex = intValue % geneItemsCount; // 98 % 11 = 10
    let id = i.toString() + "_" + itemIndex.toString(); // 1_3

    let trait = Trait.load(id);

    if (trait == null) {
      trait = new Trait(id);
    }

    // log.debug('hello count before {}', [trait.count.toString()]);

    trait.count = trait.count.plus(BigInt.fromI32(1));
    trait.save();
  }
}

export function handleApproval(event: Approval): void {}

export function handleApprovalForAll(event: ApprovalForAll): void {}

export function handleBaseGenomeChangePriceChanged(
  event: BaseGenomeChangePriceChanged
): void {}

export function handlePaused(event: Paused): void {}

export function handleRoleAdminChanged(event: RoleAdminChanged): void {}

export function handleRoleGranted(event: RoleGranted): void {}

export function handleRoleRevoked(event: RoleRevoked): void {}

export function handleTokenMinted(event: TokenMinted): void {
  let gene = event.params.newGene.toString();
  parseGeneToTraits(gene);
}

export function handleTokenMorphed(event: TokenMorphed): void {
  let id = event.transaction.hash.toHex() + event.params.tokenId.toHex()
  let tokenMorphed  = new TokenMorphedEntity(id);
    
  let contract = Contract.bind(event.address)
    
  tokenMorphed.tokenId = event.params.tokenId
  tokenMorphed.oldGene = event.params.oldGene
  tokenMorphed.newGene = contract.geneOf(tokenMorphed.tokenId)
  tokenMorphed.price = event.params.price
  tokenMorphed.eventType = event.params.eventType
  tokenMorphed.timestamp = event.block.timestamp
  tokenMorphed.priceForGenomeChange = contract.priceForGenomeChange(tokenMorphed.tokenId)
      
  tokenMorphed.save()
  
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

import type {
    Entity,
    ItemStack,
    MolangVariableMap,
    PlayerSoundOptions,
    Vector3,
} from '@minecraft/server';
import type { EntityStats, WeaponStats } from '../importStats';

type PlayerStatus = {
    sprintKnockbackHitUsed: boolean;
    sprintKnockbackValid: boolean;
    critSweepValid: boolean;
    shieldValid: boolean;
    mace: boolean;
    attackReady: boolean;
    chargeAttacking: boolean;
    showBar: boolean;
    holdInteract: boolean;
    leftClick: boolean;
    rightClick: boolean;
    lastSelectedItem: unknown;
    lastSelectedSlot: unknown;
    cooldown: number;
    lastAttackTime: number;
    lastShieldTime: number;
    foodTickTimer: number;
    fallDistance: number;
};

type ItemStatsResult = {
    equippableComp?: unknown;
    item?: ItemStack;
    stats?: WeaponStats;
};

declare module '@minecraft/server' {
    interface Entity {
        __lastAttack?: {
            rawDamage?: number;
            damage?: number;
            time?: number;
        };
        __playerHit?: boolean;
        __daggerSecondHit?: boolean;
        center(vector3?: Vector3): Vector3;
        viewRotation(dist?: number, height?: number): Vector3;
        getStatus(): PlayerStatus;
        applyAttackKnockback(location: Vector3, max_height?: number): void;
        applyImpulseAsKnockback(vector3: Vector3): void;
        spawnSelectiveParticle(
            effectName: string,
            location: Vector3,
            dynamicProperty: string,
            offset?: Vector3,
            molangVariables?: MolangVariableMap,
        ): void;
        playSelectiveSound(
            soundId: string,
            dynamicProperty: string,
            soundOptions?: PlayerSoundOptions,
        ): void;
        healthParticle(damage: number): void;
        getItemStats(itemStack?: ItemStack): ItemStatsResult;
        hasItemFlag(flag: string): boolean;
        getStats(): EntityStats | undefined;
        isTamed(options?: { excludeTypes?: string[] }): boolean;
        isRiding: boolean;
        isFasterThanWalk: boolean;
        getRidingOn(): Entity | undefined;
        getRiders(): Entity[] | undefined;
    }

    interface Player {
        __rawDamage?: number;
        runAttackCooldown(currentTick: number): void;
        getHunger(): number | undefined;
        setHunger(number: number): void;
        getSaturation(): number | undefined;
        setSaturation(number: number): void;
        getExhaustion(): number | undefined;
        setExhaustion(number: number): void;
    }

    interface ItemStack {
        hasFlag(flag: string): boolean;
    }
}

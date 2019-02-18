import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';

import * as Models from '../shared/models';
import { Environment } from '../../environments/environment';

@Injectable()
export class CharactersResolve implements Resolve<Models.ICharacter[]> {

  public static async Resolve(): Promise<Models.ICharacter[]> {
    const response = await fetch(`${Environment.ApiUrl}/characters`);

    return await response.json();
  }

  resolve(route: ActivatedRouteSnapshot): Promise<Models.ICharacter[]> {
    return CharactersResolve.Resolve();
  }
}

@Injectable()
export class CharacterIdResolve implements Resolve<Models.ICharacter> {

  public static async Resolve(id: number): Promise<Models.ICharacter> {
    const response = await fetch(`${Environment.ApiUrl}/characters/${id}`);

    return await response.json();
  }

  resolve(route: ActivatedRouteSnapshot): Promise<Models.ICharacter> {
    const id = route.params['id'];
    if (isNaN(id)) return null;

    return CharacterIdResolve.Resolve(id);
  }
}

@Injectable()
export class LanguagesResolve implements Resolve<Models.ILanguage[]> {

  public static async Resolve(): Promise<Models.ILanguage[]> {
    const response = await fetch(`${Environment.ApiUrl}/languages`);

    return await response.json();
  }

  resolve(route: ActivatedRouteSnapshot): Promise<Models.ILanguage[]> {
    return LanguagesResolve.Resolve();
  }
}

@Injectable()
export class SkillsResolve implements Resolve<Models.ISkill[]> {

  public static async Resolve(): Promise<Models.ISkill[]> {
    const response = await fetch(`${Environment.ApiUrl}/skills`);

    return await response.json();
  }

  resolve(route: ActivatedRouteSnapshot): Promise<Models.ISkill[]> {
    return SkillsResolve.Resolve();
  }
}

@Injectable()
export class PropertiesResolve implements Resolve<Models.IProperty[]> {

  public static async Resolve(): Promise<Models.IProperty[]> {
    const response = await fetch(`${Environment.ApiUrl}/properties`);

    return await response.json();
  }

  resolve(route: ActivatedRouteSnapshot): Promise<Models.IProperty[]> {
    return PropertiesResolve.Resolve();
  }
}

@Injectable()
export class SavingThrowsResolve implements Resolve<Models.ISavingThrow[]> {

  public static async Resolve(): Promise<Models.ISavingThrow[]> {
    const response = await fetch(`${Environment.ApiUrl}/saving-throws`);

    return await response.json();
  }

  resolve(route: ActivatedRouteSnapshot): Promise<Models.ISavingThrow[]> {
    return SavingThrowsResolve.Resolve();
  }
}


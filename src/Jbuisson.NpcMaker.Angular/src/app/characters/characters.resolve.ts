import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';

import * as Models from '../shared/models';
import { Environment } from '../../environments/environment';

@Injectable()
export class CharactersResolve implements Resolve<Models.ICharacter[]> {

  resolve(route: ActivatedRouteSnapshot): Promise<Models.ICharacter[]> {
    return CharactersResolve.Resolve();
  }

  public static async Resolve(): Promise<Models.ICharacter[]> {
    let response = await fetch(`${Environment.ApiUrl}/characters`);

    return await response.json();
  }
}

@Injectable()
export class CharacterIdResolve implements Resolve<Models.ICharacter> {

  resolve(route: ActivatedRouteSnapshot): Promise<Models.ICharacter> {
    var id = route.params['id'];
    if (isNaN(id)) return null;

    return CharacterIdResolve.Resolve(id);
  }

  public static async Resolve(id: number): Promise<Models.ICharacter> {
    let response = await fetch(`${Environment.ApiUrl}/characters/${id}`);

    return await response.json();
  }
}

@Injectable()
export class LanguagesResolve implements Resolve<Models.ILanguage[]> {

  resolve(route: ActivatedRouteSnapshot): Promise<Models.ILanguage[]> {
    return LanguagesResolve.Resolve();
  }

  public static async Resolve(): Promise<Models.ILanguage[]> {
    let response = await fetch(`${Environment.ApiUrl}/languages`);

    return await response.json();
  }
}

@Injectable()
export class SkillsResolve implements Resolve<Models.ISkill[]> {

  resolve(route: ActivatedRouteSnapshot): Promise<Models.ISkill[]> {
    return SkillsResolve.Resolve();
  }

  public static async Resolve(): Promise<Models.ISkill[]> {
    let response = await fetch(`${Environment.ApiUrl}/skills`);

    return await response.json();
  }
}

@Injectable()
export class PropertiesResolve implements Resolve<Models.IProperty[]> {

  resolve(route: ActivatedRouteSnapshot): Promise<Models.IProperty[]> {
    return PropertiesResolve.Resolve();
  }

  public static async Resolve(): Promise<Models.IProperty[]> {
    let response = await fetch(`${Environment.ApiUrl}/properties`);

    return await response.json();
  }
}

@Injectable()
export class SavingThrowsResolve implements Resolve<Models.ISavingThrow[]> {

  resolve(route: ActivatedRouteSnapshot): Promise<Models.ISavingThrow[]> {
    return SavingThrowsResolve.Resolve();
  }

  public static async Resolve(): Promise<Models.ISavingThrow[]> {
    let response = await fetch(`${Environment.ApiUrl}/saving-throws`);

    return await response.json();
  }
}


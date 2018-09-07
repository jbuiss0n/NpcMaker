import { ActivatedRoute } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'character-statistics',
  templateUrl: 'character-statistics.component.html',
  styleUrls: ['character-statistics.component.less']
})
export class CharacterStatisticsComponent implements OnInit {

  private StrengthModifier: string | number;
  private DexterityModifier: string | number;
  private ConstitutionModifier: string | number;
  private IntelligenceModifier: string | number;
  private WisdomModifier: string | number;
  private CharismaModifier: string | number;

  @Input()
  public Strength: number;

  @Input()
  public Dexterity: number;

  @Input()
  public Constitution: number;

  @Input()
  public Intelligence: number;

  @Input()
  public Wisdom: number;

  @Input()
  public Charisma: number;

  public ngOnInit() {
    this.StrengthModifier = CharacterStatisticsComponent.Modifier(this.Strength);
    this.DexterityModifier = CharacterStatisticsComponent.Modifier(this.Dexterity);
    this.ConstitutionModifier = CharacterStatisticsComponent.Modifier(this.Constitution);
    this.IntelligenceModifier = CharacterStatisticsComponent.Modifier(this.Intelligence);
    this.WisdomModifier = CharacterStatisticsComponent.Modifier(this.Wisdom);
    this.CharismaModifier = CharacterStatisticsComponent.Modifier(this.Charisma);
  }

  private static Modifier(score: number): string | number {
    let value = Math.floor((score - 10) / 2);
    return value > 0 ? `+${value}` : value;
  }
}

//Below constants alter the game's behaviour, see README for more details.

/**
 * Sets the limit of the number of Locations (i.e. distance) that can be generated in the Location tree
 * before reaching the _'goal Location'_.
 */
export const DEPTH_LIMIT = 4;

/**
 * Sets the limit of the number of nodes (or, distance) that can be generated in the node tree
 * away from the _'winning route'_.
 */
export const DEVIATION_LIMIT = 2;

/**
 * Sets the number of searches required before an item is found, once it has been learnt of at a Landmark.
 */
export const DEFAULT_ITEM_COUNTDOWN = 4;

/**
 * Sets the number of Quests that must be completed for the victory condition to be reached & the game end.
 */
export const QUESTS_REQUIRED_TO_WIN = 1;


import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { LocationGeneratorService } from './services/LocationServices/location-generator/location-generator.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    importProvidersFrom([BrowserAnimationsModule, BrowserModule, LocationGeneratorService])
    ]
};

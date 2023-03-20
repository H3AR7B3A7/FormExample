import { NgModule, isDevMode } from '@angular/core'
import { AppRoutingModule } from '@app/app-routing.module'
import { AppComponent } from '@app/app.component'
import { CoreModule } from '@app/core/core.module'
import { DataService } from '@app/core/service/data.service'
import { RootEffects } from '@app/state/root.effects'
import { rootReducer } from '@app/state/root.reducer'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { HomeComponent } from './home/home.component'

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    CoreModule,
    AppRoutingModule,
    StoreModule.forRoot(rootReducer, {}),
    EffectsModule.forRoot([RootEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    HttpClientInMemoryWebApiModule.forRoot(DataService, { delay: 4000 }), // Artificial delay !!!
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

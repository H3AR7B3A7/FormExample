import { NgModule, isDevMode } from '@angular/core'
import { CoreModule } from '@app/core/core.module'
import { DataService } from '@app/core/service/data.service'
import { rootReducer } from '@app/state/root.reducer'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

@NgModule({
  declarations: [AppComponent],
  imports: [
    CoreModule,
    AppRoutingModule,
    StoreModule.forRoot(rootReducer, {}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    HttpClientInMemoryWebApiModule.forRoot(DataService, { delay: 3000 }), // Artificial delay !!!
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

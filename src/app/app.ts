import { Component, OnInit, HostListener } from '@angular/core';
import { TvmazeService } from '../app/Servicios/tvmaze'

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  standalone: false
})
export class App implements OnInit {
  showInfo: any;
  cast: any[] = [];
  episodes: any[] = [];
  heroImage: string = '';
  isOffline: boolean = false;
  deferredPrompt: any;
showInstallButton: boolean = false;

  constructor(private tvmazeService: TvmazeService) {
  
    this.isOffline = !navigator.onLine;
  }

  ngOnInit(): void {
    this.loadData();
  }

  @HostListener('window:offline', ['$event'])
  onOffline(event: any) {
    this.isOffline = true;
  }

  @HostListener('window:online', ['$event'])
  onOnline(event: any) {
    this.isOffline = false;
    this.loadData(); 
  }
  trailerUrl: string = 'https://www.youtube.com/watch?v=VIHKWaPOEyw';

verTrailer() {
  if (this.trailerUrl) {
    window.open(this.trailerUrl, '_blank');
  }
}

  loadData() {
    if (this.isOffline) return; 

    this.tvmazeService.getShowInfo().subscribe(data => this.showInfo = data);
    this.tvmazeService.getCast().subscribe(data => this.cast = data.slice(0, 5)); 
    this.tvmazeService.getEpisodes().subscribe(data => this.episodes = data);
    
    this.tvmazeService.getImages().subscribe(images => {
 
      const bgImage = images.find((img: any) => img.type === 'background');
      this.heroImage = bgImage ? bgImage.resolutions.original.url : this.showInfo?.image?.original;
    });
  }

@HostListener('window:beforeinstallprompt', ['$event'])
onBeforeInstallPrompt(e: any) {
  e.preventDefault();
  this.deferredPrompt = e;
  this.showInstallButton = true;
  console.log('Evento beforeinstallprompt capturado');
}

instalarPWA() {
  if (!this.deferredPrompt) {
    return;
  }
  this.deferredPrompt.prompt();
  this.deferredPrompt.userChoice.then((choiceResult: any) => {
    if (choiceResult.outcome === 'accepted') {
      console.log('El usuario instaló la app');
    } else {
      console.log('El usuario canceló la instalación');
    }
    this.deferredPrompt = null;
    this.showInstallButton = false;
  });
}
}

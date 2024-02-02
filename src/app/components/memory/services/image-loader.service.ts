import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

interface Image {
  id: number;
  path: string;
}

@Injectable({
  providedIn: 'root',
})
export class ImageLoaderService {
  private imgUrl = 'assets/memoryGameImg/list.json';

  constructor(private http: HttpClient) {}

  getImagePaths(): Observable<Image[]> {
    return this.http.get<{ images: Image[] }>(this.imgUrl).pipe(
      map((data) => {
        const originalImages = data.images || [];
        const duplicatedImages = this.duplicateImages(originalImages);
        return duplicatedImages;
      })
    );
  }

  private duplicateImages(images: Image[]): Image[] {
    // Duplicar cada imagen manteniendo los mismos IDs
    const duplicatedImages = images.flatMap((image) => [image, { ...image }]);

    return duplicatedImages;
  }
}

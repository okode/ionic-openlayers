import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import { fromLonLat } from 'ol/proj';
import OSM from 'ol/source/OSM';
import { defaults as defaultInteractions, Draw, Modify, Snap } from 'ol/interaction';
import DragRotateAndZoom from 'ol/interaction/DragRotateAndZoom';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import Geometry from 'ol/geom/Geometry';
import { never } from 'ol/events/condition';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {

  private map: Map;
  private draw: Draw;
  private snap: Snap;
  private source: VectorSource<Geometry>;

  ngOnInit() {
    const raster = new TileLayer({
      source: new OSM(),
    });
    
    this.source = new VectorSource();
    const vector = new VectorLayer({
      source: this.source,
      style: new Style({
        fill: new Fill({
          color: 'rgba(255, 255, 255, 0.2)',
        }),
        stroke: new Stroke({
          color: '#ffcc33',
          width: 2,
        }),
        image: new CircleStyle({
          radius: 7,
          fill: new Fill({
            color: '#ffcc33',
          }),
        }),
      }),
    });

    this.map = new Map({
      target: 'map',
      interactions: defaultInteractions().extend([new DragRotateAndZoom()]),
      layers: [raster, vector],
//        new TileLayer({
//          source: new OSM()
//        })
 //     ],
      view: new View({
        center: fromLonLat([37.41, 8.82]),
        zoom: 4
      })
    });

    const modify = new Modify({ source: this.source });
    this.map.addInteraction(modify);

    this.addInteractions();

    setTimeout(() => { this.map.updateSize(); }, 50);
  }

  addInteractions() {
    this.draw = new Draw({
      source: this.source,
      type: 'LineString',
      freehandCondition: never
    });
    this.map.addInteraction(this.draw);
    this.snap = new Snap({ source: this.source });
    this.map.addInteraction(this.snap);
  }

}

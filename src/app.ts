import { Component } from './component';
import { startTraining } from './training';

const app = new Component({ className: 'app' });
document.body.appendChild(app.getNode());

export function startApp(): void {
  startTraining();
}

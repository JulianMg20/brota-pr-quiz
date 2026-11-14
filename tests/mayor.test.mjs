import { test } from 'node:test';
import assert from 'node:assert/strict';
import { esMayorDeEdad } from '../src/edad.mjs';

test('esMayorDeEdad cambia el día del cumpleaños 18', () => {
  const hoy = new Date('2026-11-14T00:00:00Z');
  assert.equal(esMayorDeEdad('2008-11-15', hoy), false);
  assert.equal(esMayorDeEdad('2008-11-14', hoy), true);
});

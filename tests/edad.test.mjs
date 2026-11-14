import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calcularEdad } from '../src/edad.mjs';

test('calcularEdad descuenta un año si aún no llega el cumpleaños', () => {
  assert.equal(calcularEdad('2008-12-01', new Date('2026-11-14T00:00:00Z')), 17);
  assert.equal(calcularEdad('2008-11-14', new Date('2026-11-14T00:00:00Z')), 18);
});

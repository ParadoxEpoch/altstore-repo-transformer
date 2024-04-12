# altstore-repo-transformer
Extremely basic Node.js script to transform AltStore v2 repos into eSign compatible sources

## Dependencies
- Node.js
  - Tested on Node.js v18, but most versions of Node.js should be compatible.

## Usage
Just run `node altstore-transform.js` in the project's root directory.

By default this script will transform two popular AltStore repos *(Quantum Source)* by downloading their metadata JSON from GitHub, performing the transformations and outputting them in the script's directory.

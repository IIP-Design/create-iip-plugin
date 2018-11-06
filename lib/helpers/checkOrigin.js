/**
 * Helper functions to check if the user set a valid github URI.
 *
 * @param {string} uri The path to the plugin's git repository.
 * @return {boolean} If true user supplied a valid repo name, if not supplied repo is not valid. 
 */

module.exports = {
  checkRepo: ( uri ) => {
    let valid = false;
    const regex = /(https:\/\/github\.com\/)/;

    if ( uri && uri.search(regex) !== -1 ) {
      valid = true;
    }

    return valid;
  }
};

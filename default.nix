{
  name ? "sample-rails-app",
  railsEnv ? null,
  masterKey ? "b8085db5c6b1fe5cb794bc199c7a4313",
  developmentSecret ? "0d996176af46ffd1894d328d703f2b37",
  actionCableConfig ? null,
  packagePriority ? 100,
  pkgs ? import ((import <nixpkgs> { }).fetchFromGitHub {
    owner = "zetavg";
    repo = "nix-packages";
    rev = "c87dde8ab49d16eb4a22a442ab7fe03b29134b34";
    sha256 = "00m00i9x2w5nfsz0wz670pv2zfzqriwyvc4xmimkll095a68fndy";
  }) { },
  fetchurl ? pkgs.fetchurl,
  fetchgit ? pkgs.fetchgit,
  nodejs ? pkgs.nodejs-10_x,
  stdenv ? pkgs.stdenv,
  mkNpmPackageDerivation ? pkgs.mkNpmPackageDerivation,
  ...
}:
let
  nodePackageArgs = import ./node-package.nix { inherit fetchurl fetchgit; };
in mkNpmPackageDerivation (nodePackageArgs // {
  inherit nodejs;
})

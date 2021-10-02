# * Modify your INSTALL LOCATION Here

INSTALL_LOC="/mnt/c/Users/HP/AppData/Local/Packages/Microsoft.MinecraftUWP_8wekyb3d8bbwe/LocalState/games/com.mojang/behavior_packs/"

PKG_NAME="barrier_generator"

cp functions/*.mcfunction ${INSTALL_LOC}/${PKG_NAME}/functions
cp manifest_bedrock.json ${INSTALL_LOC}/${PKG_NAME}/manifest.json

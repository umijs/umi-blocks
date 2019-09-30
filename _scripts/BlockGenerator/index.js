const Generator = require('yeoman-generator');
const { statSync } = require('fs');
const glob = require('glob');

class BlockGenerator extends Generator {
  writing() {
    glob
      .sync('**/*', {
        cwd: this.templatePath(),
        dot: true,
      })
      .forEach(file => {
        const filePath = this.templatePath(file);
        if (statSync(filePath).isFile()) {
          this.fs.copyTpl(
            this.templatePath(filePath),
            this.destinationPath(file.replace(/^_/, '.')),
            {
              name: process.env.BLOCK.split('/')[1],
            },
          );
        }
      });
  }
}

module.exports = BlockGenerator;

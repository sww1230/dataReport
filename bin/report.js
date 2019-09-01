#!/usr/bin/env node

const clone = require('git-clone')
const program = require('commander')
const shell = require('shelljs');
const log = require('tracer').colorConsole()


program
    .version('1.1.0', '-v, --version')
    .description('BI报表应用的cli')
    .usage('report-cli create 新项目名称')
    .option('-b, --bbq-sauce', 'Add bbq sauce')
    .option('-f, --fgasdfa', 'adfasdf')
    .option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble');

    // console.log('you ordered a pizza with:');
    // if (program.cheese) console.log('  - cheese');
    // if (program.sauce) console.log('  - adfasdf');

    // 删除文件夹
    // program.command('rmdel <dir>')
    //   .action(function (dir) {
    //     let pwd = shell.pwd()
    //       console.log('rmdel %s', `${pwd}/${dir}`);
    //       shell.rm('-rf', `${pwd}/${dir}`)
    //     })

program
    // .command('* <tpl> <project>')
    .command('create <project>')
    .description('创建一个BI报表应用工程')//描述
    .alias('c')//命令别名
    .action(function(project) {
        log.info('项目初始化')
        log.info('进行中...')
        if (project) {
            let pwd = shell.pwd()
            log.info(`项目当前位置：${pwd}/${project}/ ...`)
            // http://code.ds.gm.com.cn/gitlab/scot/dp/report-platform-front.git
            clone(`http://code.ds.gm.com.cn/gitlab/shangwenwu-ds/report-cli.git`, pwd + `/${project}`, null, function() {
                shell.rm('-rf', pwd + `/${project}/.git`)
                log.info('报表应用框架已创建完成！')
                shell.cd(`${project}`)
                log.info('正在安装项目依赖文件...')
                shell.exec('npm install');
                log.info('项目启动中...')
                shell.exec('npm run serve');
            })
        } else {
            log.error('正确命令例子：report-cli create myProject')
        }
    })
program.parse(process.argv)

<?php
/* NOTICE: autogenerated file; Do not edit by hand */
namespace specimens\misc;
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\CJSModule;
use VK\Elephize\Builtins\ReactContext;

class CustomIsomorphicsModule extends CJSModule {
    /**
     * @var CustomIsomorphicsModule $_mod
     */
    private static $_mod;
    public static function getInstance(): CustomIsomorphicsModule {
        if (!self::$_mod) {
            self::$_mod = new CustomIsomorphicsModule();
        }
        return self::$_mod;
    }

    /**
     * @var mixed[] $obj4
     */
    public $obj4;

    private function __construct() {
        $this->obj4 = [
            "a" => 1,
            "b" => 2,
        ];
        do {
            \VK\Elephize\Builtins\Console::log(\specimens\misc\ToReplaceCjsWrapper::getInstance()->getLang("lol!"));
            \VK\Elephize\Builtins\Console::log(
                \specimens\misc\ToReplaceCjsWrapper::getInstance()->getLangStatic("lol!")
            );
            \VK\Elephize\Builtins\Console::log(
                \specimens\misc\toReplaceIndex\ToReplaceSecondCjsWrapper::getInstance()->getFoo("lol!")
            );
            \VK\Elephize\Builtins\Console::log(
                \specimens\misc\toReplaceIndex\ToReplaceSecondCjsWrapper::getInstance()->getBar("lol!")
            );
            \VK\Elephize\Builtins\Console::log(
                \specimens\misc\toReplaceIndex\ToReplaceSecondCjsWrapper::getInstance()->getTest1("lol!")
            );
            \VK\Elephize\Builtins\Console::log(
                \specimens\misc\toReplaceIndex\ToReplaceSecondCjsWrapper::getInstance()->getTest2("lol!", "lol!")
            );
            \VK\Elephize\Builtins\Console::log(
                \specimens\misc\toReplaceIndex\ToReplaceSecondCjsWrapper::getInstance()->getTest3("lol!")
            );
            \VK\Elephize\Builtins\Console::log(
                \specimens\misc\toReplaceIndex\ToReplaceSecondCjsWrapper::getInstance()->getTest4("lol!", "lol!")
            );
            \VK\Elephize\Builtins\Console::log(
                \specimens\misc\toReplaceIndex\ToReplaceSecondCjsWrapper::getInstance()->getTest5("lol!")
            );
            if ($this->obj4) {
                break;
            }
        } while (true);
    }
}

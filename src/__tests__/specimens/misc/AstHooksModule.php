<?php
/* NOTICE: autogenerated file; Do not edit by hand */
namespace specimens\misc;
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\CJSModule;
use VK\Elephize\Builtins\ReactContext;

class AstHooksModule extends CJSModule {
    /**
     * @var AstHooksModule $_mod
     */
    private static $_mod;
    public static function getInstance(): AstHooksModule {
        if (!self::$_mod) {
            self::$_mod = new AstHooksModule();
        }
        return self::$_mod;
    }

    /**
     * @param float $x
     * @return float
     */
    public function AstHooksSideFunc($x) {
        return $x + 1 + 4.;
    }

    private function __construct() {
    }
}

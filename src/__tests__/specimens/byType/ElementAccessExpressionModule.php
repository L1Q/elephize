<?php
/* NOTICE: autogenerated file; Do not edit by hand */
namespace \specimens\byType;
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\CJSModule;

class ElementAccessExpressionModule extends CJSModule {
    /**
     * @var ElementAccessExpressionModule $_mod
     */
    private static $_mod;
    public static function getInstance(): ElementAccessExpressionModule {
        if (!self::$_mod) {
            self::$_mod = new ElementAccessExpressionModule();
        }
        return self::$_mod;
    }

    /**
     * @var array $b
     */
    public $b;
    /**
     * @var float $d
     */
    public $d;

    private function __construct() {
        $this->b = [1, 2, 3];
        $this->d = $this->b[1];
        \VK\Elephize\Builtins\Console::log($this->d);
    }
}

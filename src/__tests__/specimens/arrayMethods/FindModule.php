<?php
/* NOTICE: autogenerated file; Do not edit by hand */
namespace specimens\arrayMethods;
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\CJSModule;
use VK\Elephize\Builtins\ReactContext;

class FindModule extends CJSModule {
    /**
     * @var FindModule $_mod
     */
    private static $_mod;
    public static function getInstance(): FindModule {
        if (!self::$_mod) {
            self::$_mod = new FindModule();
        }
        return self::$_mod;
    }

    /**
     * @var float[] $aff
     */
    public $aff;
    /**
     * @var float $bff
     */
    public $bff;
    /**
     * @var float $cff
     */
    public $cff;

    private function __construct() {
        $this->aff = [1, 2, 3];
        $this->bff = Stdlib::arrayFind(
            $this->aff,
            /* anon_dbfe777 */ function ($el) {
                return $el % 2;
            }
        );
        $this->cff = Stdlib::arrayFind(
            $this->aff,
            /* anon_cc7ba3f */ function ($el, $idx) {
                return ($el * $idx) % 2;
            }
        );
        \VK\Elephize\Builtins\Console::log($this->bff, $this->cff);
    }
}
